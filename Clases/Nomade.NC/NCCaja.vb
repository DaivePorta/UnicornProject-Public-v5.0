Public Class NCCaja
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    'ccabrera 03022015 Se agregó usuario responsable como parametro
    Public Function ListarCaja(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_sucursal As String, ByVal p_tipo As String, ByVal p_estado As String, Optional p_Usua_Id As String = "", Optional p_Ind As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_sucursal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAJA", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_Usua_Id, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_IND", p_Ind, ParameterDirection.Input, 253))

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


    Public Function ListarCajasAperturadas(ByVal p_codigo As String, ByVal p_empresa As String, ByVal p_sucursal As String,
                                           ByVal p_tipo As String, ByVal p_estado As String, Optional ByVal p_USUA_ID As String = "") As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFB_LISTAR_CAJAS_APERTURADAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_estado, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_sucursal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAJA", p_tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))

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

    Public Function ActualizarCaja(ByVal p_codigo As String, ByVal empresa As String,
                                       ByVal sucursal As String, ByVal tipocaja As String, ByVal p_descripcion As String,
                                        ByVal p_telefono As String, ByVal p_anexo As String, ByVal p_contacto As String,
                                        ByVal p_activo As String, ByVal p_user As String, ByVal p_ctas_code As String) As String
        Try
            Dim msg As String = "ERROR"

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_CAJA", CommandType.StoredProcedure)


            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", sucursal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAJA", tipocaja, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TELEFONO", p_telefono, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANEXO", p_anexo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONTACTO", p_contacto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTASCONT_CODE", p_ctas_code, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = "OK"

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearCaja(ByVal empresa As String,
                                       ByVal sucursal As String, ByVal tipocaja As String, ByVal p_descripcion As String,
                                        ByVal p_telefono As String, ByVal p_anexo As String, ByVal p_contacto As String,
                                        ByVal p_activo As String, ByVal p_user As String, ByVal p_ctas_code As String) As String

        Try
            Dim msg As String

            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_CAJA", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", String.Empty, ParameterDirection.Output, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", sucursal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAJA", tipocaja, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESC", p_descripcion, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TELEFONO", p_telefono, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ANEXO", p_anexo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CONTACTO", p_contacto, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_activo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_user, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTASCONT_CODE", p_ctas_code, ParameterDirection.Input, 253))

            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_CODE").Value

            Return msg

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CambiarEstadoCaja(ByVal p_codigo As String) As String
        Try

            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CAMBIAR_ESTADO_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODE", p_codigo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", String.Empty, ParameterDirection.Output, 253))

            cmd1 = cn.Ejecuta_parms(cmd)

            msg = cmd1.Parameters("@p_ESTADO").Value

            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearCajeroPorCaja(ByVal caja_code As String, ByVal usua_cajero As String, ByVal usua_id As String) As String
        Dim msg As String

        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand

        cmd = cn.GetNewCommand("PFS_CREAR_CAJERO_POR_CAJA", CommandType.StoredProcedure)
        cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", caja_code, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_CAJERO", usua_cajero, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", usua_id, ParameterDirection.Input, 253))

        cmd1 = cn.Ejecuta_parms(cmd)

        msg = "OK"

        Return msg

    End Function

    Public Function ActualizarEstadoCajeroCaja(ByVal caja_code As String, ByVal usua_cajero As String, ByVal estado As String, ByVal usua_id As String) As String
        Dim msg As String

        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand

        cmd = cn.GetNewCommand("PFS_ELIMINAR_CAJERO_POR_CAJA", CommandType.StoredProcedure)
        cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", caja_code, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_CAJERO", usua_cajero, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", estado, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", usua_id, ParameterDirection.Input, 253))

        cmd1 = cn.Ejecuta_parms(cmd)

        msg = "OK"

        Return msg

    End Function

    Public Function ListarCajerosCaja(ByVal p_caja_code As String, ByVal p_usua_cajero As String, Optional p_ctlg_code As String = " ", Optional p_scsl_code As String = " ", Optional p_TIPO_FILTRO As String = "NORMAL") As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFS_LISTAR_CAJERO_POR_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_caja_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_CAJERO", p_usua_cajero, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_scsl_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_FILTRO", p_TIPO_FILTRO, ParameterDirection.Input, 253))
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

    Public Function ReporteInconsistenciasCaja(ByVal tipo As String, ByVal caja As String, ByVal desde As String, ByVal hasta As String, ByVal p_CAJERO As String, ByVal ctlg_code As String, scsl_code As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFS_REPORTE_INCONSISTENCIAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", tipo, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA", caja, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESDE", IIf(desde = "", "1990-01-01", desde), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_HASTA", IIf(hasta = "", Nothing, hasta), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJERO", p_CAJERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", ctlg_code, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", scsl_code, ParameterDirection.Input, 253))

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
    'ccabrera 02/02/2015 Lista Cajas por Usuario.
    Public Function ListarCajasxUsuario(p_USUA_CAJERO As String, p_empresa As String, p_sucursal As String, p_USUA_ID As String, p_ESTADO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_CAJA_USUARIO", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_CAJERO", p_USUA_CAJERO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_empresa, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_sucursal, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", If(p_ESTADO = String.Empty, DBNull.Value, p_ESTADO), ParameterDirection.Input, 253))


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

    'ccabrera 02/02/2015 Lista Responsables de Caja.
    Public Function ListarResponsablesCaja() As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFC_LISTAR_RESPONSABLE_CAJA", CommandType.StoredProcedure)

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

    Public Function listar_movimiento_maestro(ByVal p_CODIGO As String, ByVal p_CTLG_CODE As String, _
                                            ByVal p_SCSL_CODE As String, ByVal p_CAJA_CODE As String, _
                                            ByVal p_CERRADO As String, ByVal p_TIPO_CAJA As String) As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFB_LISTAR_MAESTRO_MOVIM_CAJA_01", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_SCSL_CODE", p_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CAJA_CODE", p_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CERRADO", p_CERRADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_CAJA", p_TIPO_CAJA, ParameterDirection.Input, 253))

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

    Public Function ListaPOS(ByVal P_CAJA_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, Optional ByVal P_ESTADO As String = "") As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFC_LISTAR_POS_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", P_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListaPOS_PRED(ByVal P_CAJA_CODE As String, ByVal P_CTLG_CODE As String, ByVal P_SCSL_CODE As String, Optional ByVal P_ESTADO As String = "") As DataTable
        Try
            Dim cmd As IDbCommand
            Dim dt As DataTable

            cmd = cn.GetNewCommand("PFC_LISTAR_POS_PRED_CAJA", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", P_CAJA_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CTLG_CODE", P_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_SCSL_CODE", P_SCSL_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ESTADO", P_ESTADO, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function CrearPOSCaja(ByVal P_CAJA_CODE As String, ByVal P_POST_CODE As String, ByVal P_USUA_ID As String) As String
        Dim msg As String

        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand

        cmd = cn.GetNewCommand("PFC_CREAR_POS_CAJA", CommandType.StoredProcedure)
        cmd.Parameters.Add(cn.GetNewParameter("@P_CAJA_CODE", P_CAJA_CODE, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@P_POST_CODE", P_POST_CODE, ParameterDirection.Input, 253))
        cmd.Parameters.Add(cn.GetNewParameter("@P_USUA_ID", P_USUA_ID, ParameterDirection.Input, 253))

        cmd1 = cn.Ejecuta_parms(cmd)

        msg = "OK"

        Return msg

    End Function

    Public Function EliminarPOSCaja(ByVal P_CODIGO As String) As String
        Dim msg As String

        Dim cmd As IDbCommand
        Dim cmd1 As IDbCommand

        cmd = cn.GetNewCommand("PFC_ELIMINAR_POS_CAJA", CommandType.StoredProcedure)
        cmd.Parameters.Add(cn.GetNewParameter("@P_CODIGO", P_CODIGO, ParameterDirection.Input, 253))

        cmd1 = cn.Ejecuta_parms(cmd)

        msg = "OK"

        Return msg

    End Function

    Public Function ListarUsuarioCajeroResponsable(p_CTLG_CODE As String, p_ESTADO_IND As String, p_INDICADOR As String) As DataTable
        Try
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PCS_LISTAR_CAJERO_RESPONSABLE", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", If(p_CTLG_CODE = String.Empty, DBNull.Value, p_CTLG_CODE), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", If(p_ESTADO_IND = String.Empty, DBNull.Value, p_ESTADO_IND), ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_INDICADOR", p_INDICADOR, ParameterDirection.Input, 253))

            dt = cn.Consulta(cmd)

            If Not (dt Is Nothing) Then
                Return dt
            Else
                Return Nothing
            End If

            Return dt
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class
