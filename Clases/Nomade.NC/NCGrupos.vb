Public Class NCGrupos

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarGrupos_X_CTLG(ByVal p_grup_code As String, ByVal p_ctlg_code As String, ByVal p_tipo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_GRUPO_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", p_grup_code, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_tipo, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGetGrupos(ByVal p_ctlg_code As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_GRUPO_PRODUCTO_TOMA_PEDIDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function fnGetSubGrupos(ByVal p_ctlg_code As String, ByVal p_grupo As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_SUB_GRUPO_PRODUCTO_TOMA_PEDIDO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUPO", p_grupo, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)


            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function dame_sgrupos(ByVal v_grupo As String, Optional ByVal p_opcion As String = "", Optional ByVal p_start As Integer = 0, _
                             Optional ByVal p_limit As Integer = 0, Optional ByVal p_query As String = "", Optional ByVal v_CTLG_CODE As String = "A") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_SUBGRUPO_PRODUCTO2", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE", v_grupo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", v_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_opcion", p_opcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_start", p_start, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_limit", p_limit, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_query", p_query, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function insertar_grupo(p_grup_desc As String, p_depend_code As String, p_texi_code As String, p_tatr_code As String, p_estado_ind As String,
                                   p_USUA_ID As String, p_MS_IND As String, p_MN_IND As String, p_SE_IND As String, p_MA_IND As String,
                                   p_CTLG_CODE As String, p_DETALLES_MARCA As String, p_CECC As String, p_CECD As String, p_ISC_IND As String, p_ISC_CODE As String,
                                   Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_CREAR_GRUPO_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_DESC", p_grup_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", p_depend_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXI_CODE", p_texi_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MS_IND", p_MS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MN_IND", p_MN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SE_IND", p_SE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MARCA", p_DETALLES_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GRUP_CODE_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_CECC", p_CECC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_CECD", p_CECD, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_ISC_IND", p_ISC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_ISC_CODE", p_ISC_CODE, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim msg As String
            msg = cmd.Parameters("@p_GRUP_CODE_GENERADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    'Deshabilitar configuración contable - ERICK (13/02/2018)
    'Public Function insertar_sGrupoConfigContable(p_OPERACION As String, p_SUBGRUPO As String, p_ID_CUENTA_SGRUP As String, p_CUENTA_SGRUP As String,
    'p_IMPUESTO As String, p_CTAS_ID_IMPUESTO As String, p_CUENTA_IMPUESTO As String, p_CTAS_ID_OPE_MN As String,
    'p_CUENTA_OPE_MN As String, p_CTAS_ID_OPE_ME As String, p_CUENTA_OPE_ME As String, p_CTAS_ID_RELA_OPE_MN As String,
    'p_CUENTA_RELA_OPE_MN As String, p_CTAS_ID_RELA_OPE_ME As String, p_CUENTA_RELA_OPE_ME As String,
    'p_DEBE_HABER As String, p_USUA_ID As String, p_PROD_CODE As String,
    'Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)


    Public Function insertar_sGrupoConfigContable(p_OPERACION As String, p_SUBGRUPO As String, p_ID_CUENTA_SGRUP As String, p_CUENTA_SGRUP As String,
                                                  p_DEBE_HABER As String, p_USUA_ID As String, p_PROD_CODE As String,
                                                  Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing)

        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("SpCon_AgregarSubgrupoCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION", p_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO", p_SUBGRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_SGRUP", p_ID_CUENTA_SGRUP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_SGRUP", p_CUENTA_SGRUP, ParameterDirection.Input, 253))

            'Deshabilitar configuración contable - ERICK (13/02/2018)
            'cmd.Parameters.Add(cn.GetNewParameter("@p_IMPUESTO", p_IMPUESTO, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_IMPUESTO", p_CTAS_ID_IMPUESTO, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_IMPUESTO", p_CUENTA_IMPUESTO, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_OPE_MN", p_CTAS_ID_OPE_MN, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_OPE_MN", p_CUENTA_OPE_MN, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_OPE_ME", p_CTAS_ID_OPE_ME, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_OPE_ME", p_CUENTA_OPE_ME, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_RELA_OPE_MN", p_CTAS_ID_RELA_OPE_MN, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_RELA_OPE_MN", p_CUENTA_RELA_OPE_MN, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_ID_RELA_OPE_ME", p_CTAS_ID_RELA_OPE_ME, ParameterDirection.Input, 253))
            'cmd.Parameters.Add(cn.GetNewParameter("@p_CUENTA_RELA_OPE_ME", p_CUENTA_RELA_OPE_ME, ParameterDirection.Input, 253))

            cmd.Parameters.Add(cn.GetNewParameter("@p_DEBE_HABER", p_DEBE_HABER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", p_PROD_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim msg As String
            msg = cmd.Parameters("@p_RESP").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function



    Public Function actualizar_grupo(p_grup_CODE As String, p_grup_desc As String, p_depend_code As String, p_texi_code As String,
                                     p_estado_ind As String, p_USUA_ID As String, p_MS_IND As String, p_MN_IND As String, p_SE_IND As String,
                                     p_MA_IND As String, p_DETALLES_MARCA As String, p_Centro_Costo_Cab As String, p_Centro_Costo_Det As String, p_ISC_IND As String, p_ISC_CODE As String,
                                     Optional p_CTLG_CODE As String = "N", Optional ByRef oTransaction As Nomade.DataAccess.Transaccion = Nothing) As String
        Try
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ACTUALIZAR_GRUPO_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_grup_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_grup_desc, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DEPEND_CODE", p_depend_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TEXI_CODE", p_texi_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado_ind, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MS_IND", p_MS_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MN_IND", p_MN_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SE_IND", p_SE_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_MA_IND", p_MA_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DETALLES_MARCA", p_DETALLES_MARCA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_CECC", p_Centro_Costo_Cab, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_CECD", p_Centro_Costo_Det, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_ISC_IND", p_ISC_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_FTVGRUP_ISC_CODE", p_ISC_CODE, ParameterDirection.Input, 253))

            If oTransaction Is Nothing Then
                cmd = cn.Ejecuta_parms(cmd)
            Else
                oTransaction.fnExecute_StoreProcedure(cmd)
            End If

            Dim msg As String
            msg = cmd.Parameters("@p_RESP").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function eliminar_grupo(ByVal p_CODE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFS_ELIMINAR_GRUPO_PRODUCTO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))

            cn.Ejecuta_parms(cmd)
            msg = cmd.Parameters("@p_RESP").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function lista_grupos_subgrupo_x_ctlg(ByVal p_CTLG_CODE As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_GRUPOS_SUBGRU_X_CTLG", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function lista_sGrupoConfigContable(ByVal p_OPERACION As String, ByVal p_SUBGRUPO As String,
                                               ByVal p_PROD_CODE As String, Optional ByVal p_ESTADO_IND As String = "A") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("SpCon_ListarSubgrupoCuentaContable", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_OPERACION", p_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SUBGRUPO", p_SUBGRUPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PROD_CODE", IIf(p_PROD_CODE.Equals(String.Empty), Nothing, p_PROD_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", IIf(p_ESTADO_IND.Equals(String.Empty), Nothing, p_ESTADO_IND), ParameterDirection.Input, 253))


            dt = cn.Consulta(cmd)
            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
