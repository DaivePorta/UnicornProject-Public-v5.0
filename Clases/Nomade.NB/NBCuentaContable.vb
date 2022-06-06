Public Class NBCuentaContable

    Private cn As Nomade.Connection
    Dim dt As DataTable
    Public Sub New(ByVal str As String)
        cn = New Nomade.Connection(str)
    End Sub
    Public Function ListarCuentasContables(ByVal p_CTLG_CODE As String, ByVal p_CTAS_CODE As String, ByVal p_ESTADO As String, ByVal p_ENTRADA_DATOS As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFG_LISTAR_CUENTAS_CONTABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_CODE", p_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTRADA_DATOS", p_ENTRADA_DATOS, ParameterDirection.Input, 253))

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
    Public Function ListarCuentasContablesUltimoNivel(ByVal p_CTLG_CODE As String, ByVal p_CTAS_CODE As String, ByVal p_ESTADO As String, ByVal p_ENTRADA_DATOS As String) As DataTable
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFG_LISTAR_CUENTAS_CONTABLES_ULTIMO_NIVEL_NEW", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTLG_CODE", p_CTLG_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_CTAS_CODE", p_CTAS_CODE, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ESTADO_IND", p_ESTADO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_ENTRADA_DATOS", p_ENTRADA_DATOS, ParameterDirection.Input, 253))
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


    Public Function PFS_REGISTRA_CTAS_CONTABLES(ByVal P_CGRUPCTAS_OPERACION As String, ByVal P_CGRUPCTAS_CUENTA_SGRUP As String, ByVal P_CGRUPCTAS_IMPUESTO As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_IMPUESTO As String, ByVal P_CGRUPCTAS_CUENTA_IMPUESTO As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_OPE_MN As String, ByVal P_CGRUPCTAS_CUENTA_OPE_MN As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_OPE_ME As String, ByVal P_CGRUPCTAS_CUENTA_OPE_ME As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN As String, ByVal P_CGRUPCTAS_CUENTA_RELA_OPE_MN As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME As String, ByVal P_CGRUPCTAS_CUENTA_RELA_OPE_ME As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI As String, ByVal P_CGRUPCTAS_CUENTA_RECEPCION_ANTI As String,
                                                ByVal P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI As String, ByVal P_CGRUPCTAS_CUENTA_APLICACION_ANTI As String,
                                                ByVal P_CGRUPCTAS_DEBE_HABER As String, ByVal P_USUARIO As String) As String

        Try
            Dim res As String

            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_REGISTRA_CTAS_CONTABLES", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_OPERACION", P_CGRUPCTAS_OPERACION, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_SGRUP", P_CGRUPCTAS_CUENTA_SGRUP, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_IMPUESTO", P_CGRUPCTAS_IMPUESTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_IMPUESTO", P_CGRUPCTAS_CTAS_ID_IMPUESTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_IMPUESTO", P_CGRUPCTAS_CUENTA_IMPUESTO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_OPE_MN", P_CGRUPCTAS_CTAS_ID_OPE_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_OPE_MN", P_CGRUPCTAS_CUENTA_OPE_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_OPE_ME", P_CGRUPCTAS_CTAS_ID_OPE_ME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_OPE_ME", P_CGRUPCTAS_CUENTA_OPE_ME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN", P_CGRUPCTAS_CTAS_ID_RELA_OPE_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_RELA_OPE_MN", P_CGRUPCTAS_CUENTA_RELA_OPE_MN, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME", P_CGRUPCTAS_CTAS_ID_RELA_OPE_ME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_RELA_OPE_ME", P_CGRUPCTAS_CUENTA_RELA_OPE_ME, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI", P_CGRUPCTAS_CTAS_ID_RECEPCION_ANTI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_RECEPCION_ANTI", P_CGRUPCTAS_CUENTA_RECEPCION_ANTI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI", P_CGRUPCTAS_CTAS_ID_APLICACION_ANTI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_CUENTA_APLICACION_ANTI", P_CGRUPCTAS_CUENTA_APLICACION_ANTI, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_DEBE_HABER", P_CGRUPCTAS_DEBE_HABER, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@P_USUARIO", P_USUARIO, ParameterDirection.Input, 253))
            cmd.Parameters.Add(cn.GetNewParameter("@p_RESPUESTA", String.Empty, ParameterDirection.Output, 253))

            cmd = cn.Ejecuta_parms(cmd)
            res = cmd.Parameters("@p_RESPUESTA").Value

            Return res

        Catch ex As Exception
            Throw (ex)
        End Try
    End Function

    Public Function ListarConfiguracionCuentasContables(ByVal P_CGRUPCTAS_OPERACION As String)
        Try
            Dim dt As DataTable
            Dim cmd As IDbCommand

            cmd = cn.GetNewCommand("PFS_LISTAR_CONFIGURACION_CUENTAS", CommandType.StoredProcedure)
            cmd.Parameters.Add(cn.GetNewParameter("@P_CGRUPCTAS_OPERACION", P_CGRUPCTAS_OPERACION, ParameterDirection.Input, 253))

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
