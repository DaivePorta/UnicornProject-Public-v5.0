Public Class NCEquivalenciaPlanCuentas
    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub

    Public Function Listar_Equivalencia_PlanCuentas(ByVal p_PTVEQPC_CODE As String, ByVal p_PTVEQPC_CTLG_CODE As String, ByVal p_PTVEQPC_ESTADO_IND As String, ByVal p_USER As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_EQUIVALENCIA_PLAN_CUENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CODE", p_PTVEQPC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CTLG_CODE", p_PTVEQPC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_ESTADO_IND", p_PTVEQPC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USER", p_USER, ParameterDirection.Input, 253))
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

    Public Function Crear_Equivalencia_PlanCuentas(ByVal p_PTVEQPC_CTLG_CODE As String, ByVal p_PTVEQPC_CECC_CODE_BASE As String, ByVal p_PTVEQPC_CECD_CODE_BASE As String, _
                                                    ByVal p_PTVEQPC_CECC_CODE_EQUIVALENTE As String, ByVal p_PTVEQPC_CECD_CODE_EQUIVALENTE As String, _
                                                    ByVal p_PTVEQPC_ESTADO_IND As String, ByVal p_PTVEQPC_FECHA_INICIO As String, ByVal p_PTVEQPC_FECHA_FIN As String, _
                                                    ByVal p_PTVEQPC_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_EQUIVALENCIA_PLAN_CUENTAS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CTLG_CODE", p_PTVEQPC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECC_CODE_BASE", p_PTVEQPC_CECC_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECD_CODE_BASE", p_PTVEQPC_CECD_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECC_CODE_EQUIVALENTE", p_PTVEQPC_CECC_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECD_CODE_EQUIVALENTE", p_PTVEQPC_CECD_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_ESTADO_IND", p_PTVEQPC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_FECHA_INICIO", p_PTVEQPC_FECHA_INICIO, ParameterDirection.Input, 253))
            If p_PTVEQPC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_FECHA_FIN", p_PTVEQPC_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_USUA_ID", p_PTVEQPC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function Actualizar_Equivalencia_PlanCuentas(ByVal p_PTVEQPC_CODE As String, ByVal p_PTVEQPC_CTLG_CODE As String, ByVal p_PTVEQPC_CECC_CODE_BASE As String, ByVal p_PTVEQPC_CECD_CODE_BASE As String, _
                                                    ByVal p_PTVEQPC_CECC_CODE_EQUIVALENTE As String, ByVal p_PTVEQPC_CECD_CODE_EQUIVALENTE As String, _
                                                    ByVal p_PTVEQPC_ESTADO_IND As String, ByVal p_PTVEQPC_FECHA_INICIO As String, ByVal p_PTVEQPC_FECHA_FIN As String, _
                                                    ByVal p_PTVEQPC_USUA_ID As String) As Array
        Try
            Dim msg(2) As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_EQUIVALENCIA_PLAN_CUENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CODE", p_PTVEQPC_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CTLG_CODE", p_PTVEQPC_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECC_CODE_BASE", p_PTVEQPC_CECC_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECD_CODE_BASE", p_PTVEQPC_CECD_CODE_BASE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECC_CODE_EQUIVALENTE", p_PTVEQPC_CECC_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_CECD_CODE_EQUIVALENTE", p_PTVEQPC_CECD_CODE_EQUIVALENTE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_ESTADO_IND", p_PTVEQPC_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_FECHA_INICIO", p_PTVEQPC_FECHA_INICIO, ParameterDirection.Input, 253))
            If p_PTVEQPC_FECHA_FIN = String.Empty Then
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_FECHA_FIN", DBNull.Value, ParameterDirection.Input, 253))
            Else
                cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_FECHA_FIN", p_PTVEQPC_FECHA_FIN, ParameterDirection.Input, 253))
            End If
            cmd.Parameters.Add(cn.GetNewParameter("@p_PTVEQPC_USUA_ID", p_PTVEQPC_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_GENERADO", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg(0) = cmd1.Parameters("@p_GENERADO").Value
            msg(1) = "OK"
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Crear_Tributos(p_COD_TRIBUTO As String,
                                   p_COD_TRIBUTO_ASOC As String,
                                   p_DESCRIPCION As String,
                                   p_ESTADO_IND As String,
                                   P_TIPO_TRIBUTO As String, p_USUA_ID As String,
                                   P_ABREVIATURA As String, P_DIA_VENC As String, P_PORCENTAJE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_CREAR_TRIBUTOS", CommandType.StoredProcedure)

            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_TRIBUTO", p_COD_TRIBUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_TRIBUTO_ASOC", p_COD_TRIBUTO_ASOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_TRIBUTO", P_TIPO_TRIBUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ABREVIATURA", P_ABREVIATURA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIA_VENC", P_DIA_VENC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PORCENTAJE", P_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function


    Public Function Listar_Tributos(p_TIPO_TRIBUTO As String, p_ESTADO As String, p_CODIGO As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand
            cmd = cn.GetNewCommand("PFC_LISTAR_TRIBUTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO_TRIBUTO", p_TIPO_TRIBUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))

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

    Public Function Actualizar_Tributos(p_CODIGO As String, p_COD_TRIBUTO As String,
                               p_COD_TRIBUTO_ASOC As String,
                               p_DESCRIPCION As String,
                               p_ESTADO_IND As String,
                               P_TIPO_TRIBUTO As String, p_USUA_ID As String, p_TIPO As String,
                               P_ABREVIATURA As String, P_DIA_VENC As String, P_PORCENTAJE As String) As String
        Try
            Dim msg As String
            Dim cmd As IDbCommand
            Dim cmd1 As IDbCommand

            cmd = cn.GetNewCommand("PFC_ACTUALIZAR_TRIBUTOS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CODIGO", p_CODIGO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_TRIBUTO", p_COD_TRIBUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_COD_TRIBUTO_ASOC", p_COD_TRIBUTO_ASOC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_DESCRIPCION", p_DESCRIPCION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO_IND, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_TIPO_TRIBUTO", P_TIPO_TRIBUTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_USUA_ID", p_USUA_ID, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_TIPO", p_TIPO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_ABREVIATURA", P_ABREVIATURA, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_DIA_VENC", P_DIA_VENC, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_PORCENTAJE", P_PORCENTAJE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESP", String.Empty, ParameterDirection.Output, 253))
            cmd1 = cn.Ejecuta_parms(cmd)
            msg = cmd1.Parameters("@p_RESP").Value
            Return msg
        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

End Class

